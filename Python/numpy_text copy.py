#!/usr/local/bin/python3
import numpy as np  

# X = np.array([[0,1,2],[3,4,5],[6,7,8],[9,10,11],[12,13,14],[15,16,17],[18,19,20]])  
data_mat = np.array([0,1,2,3,4])  
if len(data_mat.shape) == 1:
                # reshape(1,-1)转化成1行：
                # reshape(2,-1)转换成两行：
                # reshape(-1,1)转换成1列：
                # reshape(-1,2)转化成两列
                data_mat = data_mat.reshape((len(data_mat), 1))
                # 这里已经转化 len 行 1 列
print(data_mat)
print(data_mat.shape)

# print(X.shape)
# X.reshape((len(data_mat), 1))
# a = len()
# print (a)
# [ 0  3  6  9 12 15 18]

# print (X[:, 1:])
# [[ 1  2]
#  [ 4  5]
#  [ 7  8]
#  [10 11]
#  [13 14]
#  [16 17]
#  [19 20]]