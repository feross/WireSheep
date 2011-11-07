#ifndef FIREFLOCK_H
#define FIREFLOCK_H
#include <QtGui>
#include <string>

using namespace std;

QT_FORWARD_DECLARE_CLASS(QNetworkAccessManager)
QT_FORWARD_DECLARE_CLASS(QNetworkDiskCache)

class Fireflock : public QObject
{
	Q_OBJECT
public:
  Fireflock(QNetworkDiskCache * netcache, QObject * parent=0);

  ~Fireflock();

public slots:
	void startCapture();
	void stopCapture();
	
  void onPacket(QString data);

signals:
	void handlePacket(QString data);

private slots:

private:
  QNetworkAccessManager* m_network;
  QNetworkDiskCache* m_cache;
  
  QThread* m_backend;

};

#endif
