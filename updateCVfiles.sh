pip install -r ./src/requirements.txt
python ./src/bibtex_processor.py

Rscript -e 'pandoc::pandoc_activate(); rmarkdown::render("./src/RodrigoSTarginoCV.Rmd"); rmarkdown::render("./src/RodrigoSTarginoCV_short.Rmd")'
mv src/RodrigoSTarginoCV.pdf static/author_data/RodrigoSTarginoCV.pdf
mv src/RodrigoSTarginoCV_short.pdf static/author_data/RodrigoSTarginoCV_short.pdf