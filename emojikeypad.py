num2emoji = {
    "1": "↙️",
    "2": "⬇️",
    "3": "↘️",
    "4": "⬅️",
    "6": "➡️",
    "7": "↖️",
    "8": "⬆️",
    "9": "↗️"
}

#numpad keys to directions so I can easily punch in all the emojis for each letter

#I'm just going to punch in all letters for translating
alphabet = "1242728229262341718618191613474849464378798369937636"
numerals = alphabet[0:18] + "18" # 1-9 is just A-I, K is 0??


abcs = "abcdefghijklmnopqrstuvwxyz"
abcs = abcs.upper()

nums = "1234567890"

textToFlag = {

}

for i in range(0,26):
    textToFlag.update({abcs[i]: num2emoji[alphabet[i * 2]] + num2emoji[alphabet[i*2 + 1]]})
for i in range(0,10):
    textToFlag.update({nums[i]: num2emoji[numerals[i * 2]] + num2emoji[numerals[i*2 + 1]]})

textToFlag.update({" " : "⬇️⬇️", "#" : "⬆️↗️"})

numFlagsToText={}
for num in nums:
    numFlagsToText.update({textToFlag[num] : num})

abcFlagsToText={}

for letter in abcs:
    abcFlagsToText.update({textToFlag[letter] : letter})




print(textToFlag)
print(numFlagsToText)
print(abcFlagsToText)
    
