#coding:utf-8
# 最上行代码为了解决：Python 错误 SyntaxError: Non-ASCII character ‘\xe4’ in file
import argparse
parser = argparse.ArgumentParser(description='Process some integers.')

# parser.add_argument('integers', metavar='N', type=int, nargs='+',
#                     help='an integer for the accumulator')
# parser.add_argument('--sum', dest='accumulate', action='store_const',
#                     const=sum, default=max,
#                     help='sum the integers (default: find the max)')

parser.add_argument('--keep_result', default=False, action='store_true')


args = parser.parse_args()
# 调用 parse_args() 将返回一个具有 integers 和 accumulate 两个属性的对象

# print(args.accumulate(args.integers))

print(args)  
# 会返还一个对象，拿到终端输入的参数，对象包括
# print(args.accumulate(args.integers))
