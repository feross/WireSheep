//
// http_packet.h - C++ wrapper for http header parser.
// Part of the Firesheep project.
//
// Copyright (C) 2010 Eric Butler
//
// Authors:
//   Eric Butler <eric@codebutler.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

#ifndef FIRESHEEP_HTTP_PACKET_H
#define FIRESHEEP_HTTP_PACKET_H

#include <iostream>
#include <sstream>
#include <fstream>
#include <string>
#include <map>
#include <vector>
#include <boost/algorithm/string.hpp>
#include <boost/iostreams/filtering_stream.hpp>
#include <boost/iostreams/filter/gzip.hpp>
#include <boost/iostreams/filter/zlib.hpp>
#include <boost/iostreams/filter/bzip2.hpp>

#include "http-parser/http_parser.h"

using namespace std;
using namespace boost::iostreams;

#define HTTP_PARSER_DATA_CALLBACK(NAME)                                             \
static int NAME##_cb_wrapper (http_parser *parser, const char *buf, size_t len) {   \
  HttpPacket *packet = (HttpPacket *)parser;                                        \
  return packet->NAME##_cb(buf, len);                                               \
}                                                                                   \
int NAME##_cb(const char *buf, size_t len);

#define HTTP_PARSER_CALLBACK(NAME)                    \
static int NAME##_cb_wrapper (http_parser *parser) {  \
  HttpPacket *packet = (HttpPacket *)parser;          \
  return packet->NAME##_cb();                         \
}                                                     \
int NAME##_cb();

typedef map<string, string> HeaderMap;

class HttpPacket {
public:
  HttpPacket(string from, string to);
  bool parse(const char *payload, int payload_size);
  
  bool isComplete();
  bool isResponse();
  
  string from();
  string to();
  string host();
  string method();
  string path();
  string user_agent();
  string query();
  string cookies();
  string mime_type();
  
  int get_id();
  
  HeaderMap headers();

private:
  http_parser          m_parser;
  http_parser_settings m_settings;
  string               m_from;
  string               m_to;
  string               m_url;
  string               m_path;
  string               m_query;
  HeaderMap            m_headers;
  string               m_tmp_header_name;
  string               m_tmp_header_value;
  bool                 m_complete;
  
  ofstream             m_bodystream;
  filtering_ostream m_filterstream;
  int                  m_id;

  HTTP_PARSER_DATA_CALLBACK(url);
  HTTP_PARSER_DATA_CALLBACK(header_field);
  HTTP_PARSER_DATA_CALLBACK(header_value);
  HTTP_PARSER_DATA_CALLBACK(path);
  HTTP_PARSER_DATA_CALLBACK(query_string);
  HTTP_PARSER_CALLBACK(headers_complete);
  HTTP_PARSER_CALLBACK(message_complete);
  HTTP_PARSER_DATA_CALLBACK(body);
  
  void add_header(string name, string value);
  string get_header(string name);
};

typedef void (*http_packet_cb) (HttpPacket*);

#endif
