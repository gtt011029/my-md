import json
print ('first')
py_data = {
    'aa': 'aa',
    'bb': 'bb',
    'cc': 'cc'
}
print('py_data:', repr(py_data))

json_data = json.dumps(py_data)

print('json_data: ', json_data)

