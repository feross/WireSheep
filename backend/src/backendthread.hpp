#include <QThread>
#include <QString>
#include <string>

using namespace std;

class FlockBackend : public QThread
{
  Q_OBJECT
public:
  void emitJSON(string data);
  
  virtual void run();
  
signals:
  void onPacket(QString);
};
