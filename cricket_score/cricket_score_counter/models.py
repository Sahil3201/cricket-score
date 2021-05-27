# from django import forms
# # from django import models

# class Score(models.Model):
#     score = models.IntegerField(null=True)

#     class Meta:
#         abstract = True

# class ScoreForm(forms.ModelForm):
#     class Meta:
#         model = Score
#         fields = ('score',)


# class Match(models.Model):
#     date = models.DateTimeField(auto_now=False, auto_now_add=True)
#     match_id = models.IntegerField(unique=True, primary_key=True, null=False)
#     score_board = models.JSONField()
#     fullscore = models.IntegerField(null=True, unique=False,)
#     # objects = models.DjongoManager()
