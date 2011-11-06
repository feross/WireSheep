#include <QThread>

class FlockBackend : public QThread
{
  Q_OBJECT
  
protected:
  void run();
  
};