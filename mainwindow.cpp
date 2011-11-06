#include "mainwindow.h"
#include "fireflock.h"

#include <QWebFrame>
#include <QWebElementCollection>
#include <QNetworkDiskCache>
#include <QWebSettings>

class UserAgentWebPage : public QWebPage {
  QString userAgentForUrl(const QUrl &url ) const {
    return this->QWebPage::userAgentForUrl(url) + QString("trololololo");
  }
};

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

    UserAgentWebPage *p = new UserAgentWebPage();
    setPage(p);
    page()->setNetworkAccessManager(m_network);

    // The object we will expose to JavaScript engine:
    m_fireflock = new Fireflock(m_cache, this);

    // Signal is emitted before frame loads any web content:
    QObject::connect(page()->mainFrame(), SIGNAL(javaScriptWindowObjectCleared()),
                     this, SLOT(addJSObject()));

    // qrc:// URLs refer to resources. See fireflock.qrc
    QUrl startURL = QUrl("qrc:/index.html");

    // disable same origin
    page()->settings()->setAttribute(QWebSettings::LocalContentCanAccessRemoteUrls, true);
    page()->settings()->setAttribute(QWebSettings::LocalContentCanAccessFileUrls, true);

    // Load web content now!
    setUrl(startURL);
}

void MainWin::addJSObject() {
    // Add fireflock to JavaScript Frame as member "fireflock".
    page()->mainFrame()->addToJavaScriptWindowObject(QString("Fireflock"), m_fireflock);
}
