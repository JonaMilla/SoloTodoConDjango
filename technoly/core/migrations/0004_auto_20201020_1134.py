# Generated by Django 3.1.2 on 2020-10-20 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_remove_project_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='precio',
            field=models.CharField(max_length=15, verbose_name='Precio'),
        ),
    ]
