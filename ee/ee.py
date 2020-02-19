import sys,random

# Check parameters from the comand line 

if len(sys.argv)<3:
	print("usage ",sys.argv[0], "Players  Plays")
	sys.exit(2);
# Check if parameters anre integer. 
try:
        ii=int(sys.argv[1]);
except ValueError:
        print("Players not an int");
        sys.exit(3);
try:
        yy=int(sys.argv[2]);
except ValueError:
        print("Plays not an int");
        sys.exit(3);

# Set the initial values

players=int(sys.argv[1])
totalsum=0
x=[]
y=[]
xwin=[]
xloss=[]
xperc=[]
a=1

# Run the whole simulation 

while a<=players:
	i=1
	sum=0
	init=100
	plays=int(sys.argv[2])
	win=0
	loss=0

# Simulation per player

	while i<=plays:
		bet=random.random()
		if bet<=0.5: 
			multiplier=.6
			loss=loss+1
		else:
			multiplier=1.5
			win=win+1
		init=init*multiplier
		i=i+1
	x.append(init)
	y.append(a)
	xwin.append(win)
	xloss.append(loss)
	xperc.append((win/(win+loss))*100);
	totalsum=totalsum+init
	a=a+1

# Print results of the simulation 

a=0
totalwin=0
totalloss=0
while a<players:
	print(y[a],x[a],xperc[a])
	totalwin=totalwin+xwin[a]
	totalloss=totalloss+xloss[a]
	a=a+1
print("++++++++++++++++++++++++++++++++")
print(totalsum, totalwin,totalloss)
print(totalwin/(totalwin+totalloss)*100)

