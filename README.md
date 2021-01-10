# random-number-contest

This is a simple Redis scoreboard demo.

Here's an example run. We first start 10 instances of the script, each of which will update the Redis server once per second. Then we open up redis-cli to see the scores.

`$ for name in {1..10}; do pm2 start player.js --name $name; done`

-- Wait a few seconds or more --

```
$ redis-cli
127.0.0.1:1234> zrevrange scoreboard 0 -1 withscores
 1) "10"
 2) "6.2206896551724142"
 3) "9"
 4) "5.9315068493150687"
 5) "6"
 6) "5.8013698630136989"
 7) "7"
 8) "5.7945205479452051"
 9) "5"
10) "5.5753424657534243"
11) "4"
12) "5.4557823129251704"
13) "2"
14) "5.4285714285714288"
15) "3"
16) "5.4149659863945576"
17) "1"
18) "5.2312925170068025"
19) "8"
20) "5.0616438356164384"
127.0.0.1:1234>
```

Stop the scripts with `pm2 stop all` and/or remove them with `pm2 delete all`.

Flush your redis DB with `flushdb`.
