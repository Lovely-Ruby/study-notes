def sum_square(x, mean):
    # 数据行和平均值之间的差异。
    ret = mean**2 * len(x)
    for line in x:
        for i, cur_x in line:
            ret[i] += (cur_x - mean[i])**2 - mean[i]**2
    return ret

sum_square(2)