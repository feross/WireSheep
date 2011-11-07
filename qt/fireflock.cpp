#include <QNetworkReply>
#include <QNetworkRequest>
#include <QNetworkAccessManager>
#include <QNetworkDiskCache>
#include "fireflock.h"
#include "backendthread.hpp"
#include <iostream>

Fireflock::Fireflock(QNetworkDiskCache* netcache, QObject* parent)
    : QObject(parent), m_cache(netcache)
{
    /*  We want to share a cache with the web browser,
        in case it has some images we want: */
    m_network = new QNetworkAccessManager(this);
    m_network->setCache(m_cache);

    m_backend = new FlockBackend();
    
    connect(m_backend, SIGNAL( onPacket( QString ) ),
                   this, SLOT( onPacket( QString ) ),
                   Qt::QueuedConnection );

}

Fireflock::~Fireflock()
{
}

void Fireflock::startCapture()
{
    cout << "Button clicked" << endl;
    m_backend->start();
}

void Fireflock::stopCapture()
{
}

void Fireflock::onPacket(QString data)
{
  emit handlePacket(data);
}