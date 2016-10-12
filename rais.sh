#!/bin/bash

if [[ (-z "$1") || (-z "$2") ]]; then
	echo "ERROR: Missing arguments <dir> <year>"
	exit 1
fi

total=`ls $1 | grep -i ".txt" | wc -l | awk '{print $1}'`

echo
echo '## BEGIN ##'
echo
echo "Directory: ${1}"
echo "Year: ${2}"
echo "File count: ${total}"
echo

i=1
total_time=0

for entry in `ls $1 | grep -i ".txt"`; do

	the_file="${1}/${entry}"
	lines=`wc -l ${the_file} | awk '{print $1}'`
	lines=${lines-1}
	
	start_time=`date +%s`
	echo `date`
	echo "${i}/${total} - ${entry} "
	echo "${lines} lines total"

	node rais_parser.js --max-old-space-size=2048 --file=${the_file} --year=${2}

	end_time=`date +%s`
	exec_time=`expr $end_time - $start_time`
	total_time=$((total_time+exec_time))
	echo "done in ${exec_time} seconds"
	echo `date`
	echo

	let i++

done

echo
echo "Executed in ${total_time} seconds"
echo 
echo '## END ##'
echo