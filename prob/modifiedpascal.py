#########################################
#Challenge: The game is coin toss and the bet is 1 dollar. I have initially n dollars and committed to play m rounds. What are my chances of ruin? 
# input parameters are rounds m and initial amount n 
#
############################################
import sys
#w, h, initN = 20000, 10, 3;
if(len(sys.argv)!=3):
    print("Usage",sys.argv[0],"attempts", "initial amount");
    sys.exit()
w = 20000;
h=int(sys.argv[1]);
initN=int(sys.argv[2]);
sum=0;
half=int(w/2);
triangle = [[0 for x in range(w)] for y in range(h)] 
triangle[0][half]=1;
for i in range(1,h):
	for z in range(1,w):
		if (z<=half-initN):
			triangle[i][z]=0
		if(z==half-initN+1):
			triangle[i][z]=triangle[i-1][z+1]
		if ((half-initN+2)<=z<(w-1)):
			triangle[i][z]=triangle[i-1][z-1]+triangle[i-1][z+1]
		if(z==w):
			triangle[i][z]=triangle[i-1][z-1]


for i in range(1,h):
	for z in range(half-initN):
		triangle[i][z]=0


for i in range(1,h):
		triangle
		triangle[i][half-initN+1]=triangle[i-1][half-initN+2]



for i in range(1,w):
	sum=sum+triangle[h-1][i]

formula=1-(float(sum)/(2**(h-1)));
print("probability of ruin after ",h, "attempts and ",initN, "dollars initually is ",formula*100); 
