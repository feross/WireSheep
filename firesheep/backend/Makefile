CXX = g++
SOURCES = src/backendthread.cpp src/http_sniffer.cpp src/http_packet.cpp deps/http-parser/http_parser.c
CFLAGS = -c -isysroot /Developer/SDKs/MacOSX10.6.sdk -arch i386 -mmacosx-version-min=10.6 -DHAVE_STDARG_H -Wall 
INCLUDES = -include src/config.h -g -DPLATFORM_OSX -framework Security -framework SystemConfiguration -framework CoreFoundation -I/usr/local/include  -I/opt/local/include   -I deps/ -I deps/http-parser -I deps/json_spirit -I/opt/local/include/QtWebKit -I/opt/local/include/QtGui -I/opt/local/include/QtNetwork -I/opt/local/include/QtCore
LIBS = -lpcap 

libfire.a: $(SOURCES) $(SOURCES:.cpp=.hpp) Makefile
	$(CXX) $(CFLAGS) $(INCLUDES) $(LIBS) -o bt.o src/backendthread.cpp 
	$(CXX) $(CFLAGS) $(INCLUDES) $(LIBS) -o hs.o src/http_sniffer.cpp
	$(CXX) $(CFLAGS) $(INCLUDES) $(LIBS) -o hpack.o src/http_packet.cpp
	$(CXX) $(CFLAGS) $(INCLUDES) $(LIBS) -o hparse.o deps/http-parser/http_parser.c
	ar rcs libfire.a bt.o hs.o hpack.o hparse.o
