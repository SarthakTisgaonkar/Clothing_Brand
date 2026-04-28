import os
import sys
from wsgiref.simple_server import make_server

from django.contrib.staticfiles.handlers import StaticFilesHandler


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "genzstyle.settings")


def main():
    from genzstyle.wsgi import application

    port = int(os.environ.get("PORT", sys.argv[1] if len(sys.argv) > 1 else 8000))

    static_app = StaticFilesHandler(application)
    server = make_server("127.0.0.1", port, static_app)
    server.serve_forever()


if __name__ == "__main__":
    main()
