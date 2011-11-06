#include <QThread>

class FlockBackend : public virtual QThread
{
  Q_OBJECT
  
protected:
  virtual void run();
  
};
