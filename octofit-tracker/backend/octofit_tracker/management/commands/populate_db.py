from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import connection
from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Clear collections
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Team Marvel')
        dc = Team.objects.create(name='Team DC')

        # Create Users
        tony = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='pass', team=marvel)
        steve = User.objects.create_user(username='captainamerica', email='cap@marvel.com', password='pass', team=marvel)
        bruce = User.objects.create_user(username='hulk', email='hulk@marvel.com', password='pass', team=marvel)
        clark = User.objects.create_user(username='superman', email='superman@dc.com', password='pass', team=dc)
        brucew = User.objects.create_user(username='batman', email='batman@dc.com', password='pass', team=dc)
        diana = User.objects.create_user(username='wonderwoman', email='wonderwoman@dc.com', password='pass', team=dc)

        # Create Activities
        Activity.objects.create(user=tony, type='run', duration=30, distance=5)
        Activity.objects.create(user=steve, type='cycle', duration=60, distance=20)
        Activity.objects.create(user=bruce, type='swim', duration=45, distance=2)
        Activity.objects.create(user=clark, type='run', duration=50, distance=10)
        Activity.objects.create(user=brucew, type='cycle', duration=70, distance=25)
        Activity.objects.create(user=diana, type='swim', duration=40, distance=3)

        # Create Workouts
        Workout.objects.create(name='Morning Cardio', description='Run and cycle combo', duration=60)
        Workout.objects.create(name='Strength Training', description='Weights and resistance', duration=45)

        # Create Leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
