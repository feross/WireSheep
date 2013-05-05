TEMPLATE = app
HEADERS = fireflock.h \
	mainwindow.h \
  ../backend/src/backendthread.hpp
LIBS += -lpcap -lboost_iostreams-mt
INCLUDEPATH += ../backend/src \
    ../backend/deps \
    ../backend/deps/http-parser \
    ../backend/deps/json_spirit \
    /usr/local/include \
    /opt/local/include
SOURCES = fireflock.cpp \
	main.cpp \
	mainwindow.cpp \
	../backend/src/backendthread.cpp \
	../backend/src/http_sniffer.cpp \
	../backend/src/http_packet.cpp \
	../backend/deps/http-parser/http_parser.c

QT += network webkit

RESOURCES = ../frontend/fireflock.qrc
