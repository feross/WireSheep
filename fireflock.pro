TEMPLATE = app
HEADERS = fireflock.h \
	mainwindow.h \
  firesheep/backend/src/backendthread.hpp
# LIBS += -lpcap -Lfiresheep/backend -lfire
LIBS += -lpcap -lboost_iostreams
INCLUDEPATH += firesheep/backend/src \
    firesheep/backend/deps \
    firesheep/backend/deps/http-parser \
    firesheep/backend/deps/json_spirit \
    /usr/local/include \
    /opt/local/include
SOURCES = fireflock.cpp \
	main.cpp \
	mainwindow.cpp \
	firesheep/backend/src/backendthread.cpp \
	firesheep/backend/src/http_sniffer.cpp \
	firesheep/backend/src/http_packet.cpp \
	firesheep/backend/deps/http-parser/http_parser.c 

QT += network webkit

RESOURCES = resources/fireflock.qrc
