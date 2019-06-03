package cms.core.services;

import cms.core.model.Listener;
import cms.core.repository.ListenerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ListenerServiceImpl implements ListenerService {
    @Autowired
    private ListenerRepository listenerRepository;

    @Override
    public List<Listener> getAll()
    {
        return listenerRepository.findAll();
    }

    @Override
    public Listener saveListener(Listener listener) {

        Listener savedListener = this.listenerRepository.save(listener);


        return savedListener;
    }

    @Override
    @Transactional
    public Listener pay(Integer id) {
        Listener listener = listenerRepository.findAll().stream().filter(a -> a.getId().equals(id)).collect(Collectors.toList()).get(0);

        Optional<Listener> optionalListener = listenerRepository.findById(id);
        Listener result = optionalListener.orElse(listener);
        result.setId(listener.getId());
        result.setEmail(listener.getEmail());
        result.setPassword(listener.getPassword());
        result.setPayment(true);
        

        return result;


    }
}
