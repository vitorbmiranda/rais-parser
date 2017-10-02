#!/bin/bash

if [[ -z "$1" || -z "$2" ]]; then
	echo "Arquivo/linhas nao informado!"
	exit 1
fi

FILE_PATH=$1
LINES_COUNT=$2

if [ ! -f "$FILE_PATH" ]; then
	echo "Arquivo $FILE_PATH nao encontrado!"
	exit 1
fi

# diretorio do arquivo
FILE_DIR=$(dirname $FILE_PATH)
echo "FILE_DIR: $FILE_DIR"

# nome do arquivo
FILE_NAME=$(basename $FILE_PATH)
echo "FILE_NAME: $FILE_NAME"

# nome do arquivo sem extensão
FILE_BASE_NAME="${FILE_NAME%.*}"
echo "FILE_BASE_NAME: $FILE_BASE_NAME"

# navega para o diretorio
cd $FILE_DIR
ORIGINAL_LINE_COUNT=`wc -l < $FILE_NAME`

# pega o cabeçalho do arquivo
HEADER=`head -n 1 $FILE_NAME`
echo "HEADER: $HEADER"
echo "ORIGINAL_LINE_COUNT: $ORIGINAL_LINE_COUNT"

# remove a primeira linha senao o primeiro split fica com dois cabeçalhos 
sed '1d' $FILE_NAME > temp.tmp && mv temp.tmp $FILE_NAME

# faz o split usando o template do nome do arquivo
split -l $LINES_COUNT $FILE_NAME $FILE_BASE_NAME

# volta o header pro arquivo original
echo $HEADER | cat - $FILE_NAME > temp.tmp && mv temp.tmp $FILE_NAME

# renomeia o arquivo original e move pra pasta anterior
mv $FILE_NAME ../${FILE_NAME}.splitted

# renomeia os splits pra .TXT e acrescenta o header
for F in *
do
	echo $F
	echo $HEADER | cat - $F > temp.tmp && mv temp.tmp $F
	mv $F $F.TXT
	F=$F.TXT
	echo "* file: $F"
	LINE_COUNT=`wc -l < $F`
	echo "* line count: $LINE_COUNT"
	echo
done





