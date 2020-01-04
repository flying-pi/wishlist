from wishlist_backend.celery_app import app

@app.task
def tort():
    print("hello celery world")

