import logging
import os
from pathlib import Path

from django.db import transaction
from django.db.models.signals import post_delete, post_save, pre_delete
from django.conf import settings
from django.dispatch import receiver

from .models import UserStorage, PartialUpload, File, Directory, RecycleEntry, DirectoryEntry


logger = logging.getLogger(__name__)


@receiver(post_delete, sender=Directory)
def delete_directory(sender, instance, using, **kwargs):
    with transaction.atomic():
        try:
            user_storage = (UserStorage.objects
                       .using(using)
                       .filter(user=instance.owner)
                       .select_for_update()
                       .get())
        except UserStorage.DoesNotExist:
            # Possible if this delete is happening due to the owner being deleted.
            # In that case just ignore it.
            return
        user_storage.remove(0, file_count=0, dir_count=1)
        user_storage.save()



@receiver(post_delete, sender=File)
def delete_file(sender, instance, using, **kwargs):
    path=instance.path()

    try:
        path.unlink()
    except FileNotFoundError:
        logger.warning("Missing file when deleting file entry {}", instance.pk)

    if instance.has_thumbnail: # 썸네일이 존재할 경우 같이 삭제
        path = instance.thumbnail_path()
        try:
            path.unlink()
        except FileNotFoundError:
            logger.warning("Missing thumbnail when deleting file entry {}", instance.pk)

    with transaction.atomic(): # 파일 제거했을 때 UserStorage에 저장된 파일 갯수 및 파일 전체 크기 값 조정
        try:
            user_storage = (UserStorage.objects
                       .using(using)
                       .filter(user=instance.owner)
                       .select_for_update()
                       .get())
        except UserStorage.DoesNotExist:
            # Possible if this delete is happening due to the owner being deleted.
            # In that case just ignore it.
            return
        user_storage.remove(instance.size)
        user_storage.save()


@receiver(post_delete, sender=PartialUpload)
def delete_partial_upload(sender, instance, using, **kwargs):
    if not instance.is_completed:
        # Delete the partial file.
        try:
            instance.file_path().unlink()
        except FileNotFoundError:
            logger.warning("Missing partial upload file when deleting entry {}", instance.pk)

        # Bump up the user's storage capacity.
        with transaction.atomic():
            try:
                storage = (UserStorage.objects
                           .using(using)
                           .filter(user=instance.owner)
                           .select_for_update()
                           .get())
            except UserStorage.DoesNotExist:
                # Possible if this delete is happening due to the owner being deleted.
                # In that case just ignore it.
                return
            storage.remove(instance.size)
            storage.save()


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def setup_user(sender, instance, created, using, update_fields, **kwargs):
    '''Set up UserStorage and root directory for the user.'''

    if not created:
        return

    root_dir = Directory.objects.using(using).create(
        owner=instance,
        name="",
        parent=None,
    )
    UserStorage.objects.using(using).create(
        user=instance,
        root_dir=root_dir,
    )

'''@receiver(post_delete, sender=RecycleEntry)
def delete_file_n_dirctory(sender, instance, using, **kwargs):
    # RecycleEntry를 삭제할 때 해당 RecycleEntry가 가리키는 파일 및 디렉토리 모델도 같이 삭제한다.
    if instance.entry is None: #엔트리 복원할 떄
        return

    entry=instance.entry
    try:
        entry.delete()
    except:
        return'''
