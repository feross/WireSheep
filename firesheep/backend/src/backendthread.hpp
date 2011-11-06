#include <QThread>
#include <string>

class FlockBackend : public virtual QThread
{
  Q_OBJECT
private:
  void FlockBackend::emitJSON(string data);
  
public:
  virtual void run();
  
signals:
  void onPacket(QString);
};
