def get_category(response):
    keywords = ("Recycle", "Upcycle")
    category = "Donate"
    for word in keywords:
        if word.lower() in response.lower():
            category = word
            break
    return category
