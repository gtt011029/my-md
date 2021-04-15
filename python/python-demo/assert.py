# coding=utf-8
"""
Copyright (c) XYZ Robotics Inc. - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Author: tingting ge <tingting.ge@xyzrobotics.ai>, Date: 2021/4/9
"""
import logging
import pdb
import json


def foo(s):
    num = int(s)
    # print('>>>>n = %d' % n)
    # logging.error('n = %d' % n)
    # assert n != 0, 'n is zero'  # 断言的意思是，表达式n != 0应该是True，如果断言失败，assert语句本身就会抛出AssertionError
    pdb.set_trace()  # 输入c 继续运行
    return 10 / num


class JsonTest(object):
    def __init__(self, name, age, score):
        self.name = name
        self.age = age
        self.score = score


if __name__ == '__main__':
    # foo(0)
    json_test = JsonTest('Bob', 20, 88)
    print(json.dumps(json_test, default=lambda obj: obj.__dict__))
