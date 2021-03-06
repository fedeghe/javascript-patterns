#!/bin/bash
#-------------------------
# MALTA MULTISTART SCRIPT |
#-------------------------
now=$(date +"%T")
if [ "$1" == "kill" ]
then    
    echo -e "ENDED @ $now \n=================================\n=================================\n=================================" >> malta.log
    kill -9 `ps aux | grep malta | grep -v grep | awk '{print $2}'`
else
    # maybe clean log
    logsize=$(ls -nl malta.log | awk '{print $5}' | tr -d '[:alpha:]')
    echo -e '#################################\n> STARTING MALTA\n'
    echo 'LOG SIZE '$logsize

    if [ $logsize -gt 60000 ]
    then
        echo 'CLEANING malta.log'
        echo '' > malta.log
    fi
    echo -e "\nSTARTED @ $now" >> malta.log

    # tasks
    malta h24.js ../js >> malta.log 2>&1 &
    malta models.js ../js >> malta.log 2>&1 &
    malta h24.less ../css >> malta.log 2>&1 &

    # show live message queue
    # 
    echo -e '---------------------------------\nLOG CONTENT:\n.........\n......\n...'
    tail -f malta.log 
fi
