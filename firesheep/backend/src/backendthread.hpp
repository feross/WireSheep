#include <QThread>

class FlockBackend : public QThread
{
  Q_OBJECT
  
protected:
  virtual void run();
  
};