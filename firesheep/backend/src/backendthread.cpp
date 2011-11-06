//
// main.cpp
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

#include "backendthread.hpp"
#include "http_sniffer.hpp"
#include "http_packet.hpp"
#include <boost/bind.hpp>

#include "json_spirit_writer_template.h"

void received_packet(HttpPacket *packet);
// void list_interfaces(AbstractPlatform *platform);

static FlockBackend *back;

void FlockBackend::run() 
{
  cout << "Thread started" << endl;
  back = this;
  
  string iface("en1");
  string filter("tcp port 80");

  try { 
    HttpSniffer sniffer(iface, filter, received_packet);
    sniffer.start();
  } catch (exception &e) {
    cerr << e.what() << endl;
    return;
  } 
  
}

void FlockBackend::emitJSON(string data) {
  QString qdat(data.c_str());
  emit onPacket(qdat);
  
  cout << "Emitting!" << endl;
}

void received_packet(HttpPacket *packet)
{
  
  json_spirit::Object data_obj;
  
  if(packet->isResponse()) {
    data_obj.push_back(json_spirit::Pair("isResponse",true));
    data_obj.push_back(json_spirit::Pair("serverIP",  packet->from()));
    data_obj.push_back(json_spirit::Pair("userIP",    packet->to()));
    
    data_obj.push_back(json_spirit::Pair("id",        packet->get_id()));
    data_obj.push_back(json_spirit::Pair("mimeType",  packet->mime_type()));
  } else {
    data_obj.push_back(json_spirit::Pair("isResponse",false));
    data_obj.push_back(json_spirit::Pair("serverIP",  packet->to()));
    data_obj.push_back(json_spirit::Pair("userIP",    packet->from()));   
    
    data_obj.push_back(json_spirit::Pair("method",    packet->method()));
    data_obj.push_back(json_spirit::Pair("path",      packet->path()));
    data_obj.push_back(json_spirit::Pair("query",     packet->query()));
    data_obj.push_back(json_spirit::Pair("host",      packet->host()));
    data_obj.push_back(json_spirit::Pair("cookies",   packet->cookies()));
    data_obj.push_back(json_spirit::Pair("userAgent", packet->user_agent()));
  }
  
  string data = json_spirit::write_string(json_spirit::Value(data_obj), false);
  // cout << data << endl;
  
  back->emitJSON(data);
  // emit onPacket(QString(data));
}
