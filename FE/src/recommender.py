import sys

#call the serial_connection() function
# 1 is the command arg you passed
#command = sys.argv[1]

# 2 is the comport arg you passed
#comport = sys.argv[2]

with open('following.json') as ff:
    for line in ff:
        print(line)

with open('survey.json') as sf:
    for line in sf:
        print(line)


print(" hi jake ")
