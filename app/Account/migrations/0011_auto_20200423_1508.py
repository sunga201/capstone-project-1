# Generated by Django 2.2.12 on 2020-04-23 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0010_auto_20200422_0911'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, verbose_name='이메일 주소'),
        ),
    ]
