#coding:utf-8
def decorator(func):
    def wrapper(*args, **kwargs):
        print('123')
        return func(*args, **kwargs)

    return wrapper

@decorator
def say_hello():
    print('同学你好')

say_hello()