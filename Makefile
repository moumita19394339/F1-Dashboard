.PHONY: venv install setup run clean

venv:
	@if [ ! -d .venv ]; then \
		python3 -m venv .venv; \
		echo "Created .venv"; \
	else \
		echo ".venv already exists"; \
	fi

install: venv
	.venv/bin/python -m pip install --upgrade pip
	.venv/bin/python -m pip install -r requirements.txt

setup: install

run: install
	.venv/bin/python src/app.py

clean:
	rm -rf .venv