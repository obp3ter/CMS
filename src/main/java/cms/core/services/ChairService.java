package cms.core.services;

import cms.core.model.Chair;

import java.util.List;

public interface ChairService {
    List<Chair> getAll();
    Chair saveChair(Chair chair);
}
