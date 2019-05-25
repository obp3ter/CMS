package cms.core.services;

import cms.core.model.Listener;

import java.util.List;

public interface ListenerService {
    List<Listener> getAll();
    Listener saveListener(Listener listener);
    Listener pay(Integer id);
}
