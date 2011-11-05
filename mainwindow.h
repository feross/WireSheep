#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QWebView>

class Fireflock;
QT_FORWARD_DECLARE_CLASS(QNetworkDiskCache)

class MainWin : public QWebView
{
    Q_OBJECT

public:
    explicit MainWin(QWidget * parent = 0);

private:
    Fireflock * m_fireflock;
    QNetworkAccessManager * m_network;
    QNetworkDiskCache * m_cache;

private slots:
    void addJSObject();

};
#endif
