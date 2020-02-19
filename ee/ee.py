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
totallosers=0
moderatewinners=0
winners=0
superwinners=0
totalloserswealth=0
totalmoderatewinnerswealth=0
totalwinnerswealth=0
superwinnerswealth=0
while a<players:
	print(y[a],x[a],xperc[a])
	totalwin=totalwin+xwin[a]
	totalloss=totalloss+xloss[a]
	if x[a]<100.0:
		totallosers=totallosers+1
		totalloserswealth=totalloserswealth+x[a]
	if x[a]>100.0 and x[a]<500.0:
		moderatewinners=moderatewinners+1
		totalmoderatewinnerswealth=totalmoderatewinnerswealth+x[a]
	if x[a]>500.0 and x[a]<2000.0:
		winners=winners+1	
		totalwinnerswealth=totalwinnerswealth+x[a]
	if x[a]>2000.0:
		superwinners=superwinners+1
		superwinnerswealth=superwinnerswealth+x[a]
	a=a+1
print("++++++++++++++++++++++++++++++++")
print(totalsum/players)
print(totalsum, totalwin,totalloss)
print(totalwin/(totalwin+totalloss)*100)
print(totallosers,moderatewinners,winners,superwinners)
print("loosers wealth", totalloserswealth, "moderate wealth ".totalmoderatewinnerswealth, "winners wealth",totalwinnerswealth,"super winners wealth",superwinnerswealth)

