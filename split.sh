#!/bin/bash
echo

while test $# -gt 0; do
  case "$1" in

    -f|--file)
    shift
    if test $# -gt 0; then
      FILE=$1
    else
      echo "ERRO: -f Arquivo nao especificado"
      echo
      exit 1
    fi

    # pega a primeira linha do arquivo
    FIRST_LINE=$(head -n 1 $FILE)

    # variavel pra pular a primeira linha
    IS_FIRST=true

    MUNI_REGEX="^([0-9]{6}).*$"

    while IFS= read -r LINE
    do

      if [ "$IS_FIRST" = true ] ; then 
        
        # pega a o município
        if [[ $LINE =~ $MUNI_REGEX ]]; then
          
          # aqui passa pra variável depois do match
          MUNI="${BASH_REMATCH[1]}"

          # nome = arquivo original + muni
          MUNI_FILE_NAME="${FILE}-${MUNI}.txt"

          # se não existe o arquivo ainda, cria com o header
          if [ ! -f "$MUNI_FILE_NAME" ]; then
            echo $FIRST_LINE > $MUNI_FILE_NAME
          fi

          echo $LINE >> $MUNI_FILE_NAME
          
        fi

      else
        IS_FIRST=false  
      fi

    done < "$FILE"

    shift
    ;;

    *)
      echo "Opcao invalida: $1"
      exit 1
      break
      ;;
    
  esac
done

echo
