#include "mainwindow.h"
#include "fireflock.h"

#include <QWebFrame>
#include <QWebElementCollection>
#include <QNetworkDiskCache>

/*
 * Default Constructor
 */
MainWin::MainWin(QWidget * parent) : QWebView(parent)
{
    m_network = new QNetworkAccessManager(this);
    m_cache = new QNetworkDiskCache(this);
    m_cache->setCacheDirectory(QDesktopServices::storageLocation(QDesktopServices::CacheLocation) + "/fireflock");
    m_cache->setMaximumCacheSize(1000000); //set the cache to 10megs
    m_network->setCache(m_cache);
    page()->setNetworkAccessManager(m_network);

    // The object we will expose to JavaScript engine:
    m_fireflock = new Fireflock(m_cache, this);

    // Signal is emitted before frame loads any web content:
    QObject::connect(page()->mainFrame(), SIGNAL(javaScriptWindowObjectCleared()),
                     this, SLOT(addJSObject()));

    // qrc:// URLs refer to resources. See imagenalayzer.qrc
    QUrl startURL = QUrl("qrc:/index.html");

    // Load web content now!
		setUrl(startURL);

		m_fireflock->startCapture();
}

void MainWin::addJSObject() {
    // Add fireflock to JavaScript Frame as member "fireflock".
    page()->mainFrame()->addToJavaScriptWindowObject(QString("Fireflock"), m_fireflock);
}

