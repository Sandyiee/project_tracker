from django.db import models

class Manager(models.Model):
    manager_id=models.AutoField(primary_key=True)
    name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    department=models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Client(models.Model):
    client_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    manager = models.ForeignKey(Manager, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class TechTeam(models.Model):
    member_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    roll = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Feedback(models.Model):
    feedback_id = models.AutoField(primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    comments = models.TextField()
    ratings = models.PositiveIntegerField()

    def __str__(self):
        return f"Feedback {self.feedback_id} - Rating: {self.ratings}"
    

