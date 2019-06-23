## Installation

Python 3.6+ and NodeJS 8+ is required.

## Development

```sh
# goto project root
cd PROJECT_ROOT

# setup python virtual environment for project
virtualenv -p python3.6 .venv

# activate virtual environment
source .venv/bin/activate

# install backend dependencies
pip install -r api/requirments.txt

# migrate database
python api/manage.py migrate

# create an admin user
python api/manage.py createsuperuser

# start the api servers
python api/manage.py runserver

# install frontend dependencies
npm install

# start frontend server
npm start
```