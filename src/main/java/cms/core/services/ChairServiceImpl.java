package cms.core.services;

import cms.core.model.Chair;
import cms.core.repository.ChairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChairServiceImpl implements ChairService {
    @Autowired
    private ChairRepository chairRepository;

    @Override
    public List<Chair> getAll()
    {
        return chairRepository.findAll();
    }

    @Override
    public Chair saveChair(Chair chair) {

        Chair savedChair = this.chairRepository.save(chair);


        return savedChair;
    }
}
