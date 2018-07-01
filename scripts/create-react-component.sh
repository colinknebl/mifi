#! /bin/bash

read -p "What is the component name? " COMPONENT
read -p "What is the component path? $(pwd)" MYPATH

echo $(pwd)$MYPATH/$COMPONENT

mkdir -p $(pwd)$MYPATH/$COMPONENT ; cd $(pwd)$MYPATH/$COMPONENT

touch $COMPONENT.js $COMPONENT.css $COMPONENT.test.js