# Generated by Django 2.2.12 on 2020-06-01 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('capstone_account', '0003_auto_20200601_1327'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
