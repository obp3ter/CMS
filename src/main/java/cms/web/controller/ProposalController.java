package cms.web.controller;

import cms.core.model.Proposal;
import cms.core.services.FileStorageService;
import cms.core.services.ProposalService;
import cms.web.converter.ProposalConverter;
import cms.web.dto.ProposalDto;
import cms.web.payload.UploadFileResponse;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ProposalController {
    @Autowired
    private FileStorageService fileStorageService;
    @Autowired
    private ProposalService proposalService;
    @Autowired
    private ProposalConverter proposalConverter;

    @PostMapping("/proposals/uploadfile")
    public List<UploadFileResponse> uploadAbstract( @RequestParam("proposalID") Integer aID,
                                                    @RequestParam("whichFile") String which,
                                                    @RequestParam("file") MultipartFile file
    ) throws Exception
    {



        List<Proposal> proposals = proposalService.getAll();

        Proposal proposal=new Proposal();
        proposals.stream().forEach(s->{
            if(s.getId()==aID)
            {
                proposal.setId(s.getId());
                proposal.setAuthorID(s.getAuthorID());
                proposal.setAbstractFileName(s.getAbstractFileName());
                proposal.setPaperFileName(s.getPaperFileName());
                proposal.setProposalName(s.getProposalName());
                proposal.setKeyWords(s.getKeyWords());
                proposal.setTopics(s.getTopics());
                proposal.setListOfAuthors(s.getListOfAuthors());
            }
        });

        var result = new ArrayList<UploadFileResponse>();

        if(which=="abstract")
            proposal.setAbstractFileName(file.getOriginalFilename());
        else if(which=="paper")
            proposal.setPaperFileName(file.getOriginalFilename());
        else
            throw new Exception("error");

        String fileName = fileStorageService.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/downloadFile/")
                    .path(fileName)
                    .toUriString();
        result.add(new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize()));

        proposalService.updateProposal(aID,proposal);


        return  result;
    }

    @RequestMapping(value = "/proposals", method = RequestMethod.POST)
    ProposalDto saveProposal(@RequestParam("proposalID") Integer aID,
                             @RequestParam("proposalID") Integer pID,
                             @RequestParam("proposalName") String proposalName,
                             @RequestParam("keyWords") String keyWords,
                             @RequestParam("topics") String topics,
                             @RequestParam("listOfAuthors") String listOfAuthors
                             ) {

        ProposalDto dto = new ProposalDto(pID,aID,"","",proposalName,keyWords,topics,listOfAuthors);

        Proposal saved = this.proposalService.save(
                proposalConverter.convertDtoToModel(dto)
        );
        ProposalDto result = proposalConverter.convertModelToDto(saved);


        return result;
    }

    @RequestMapping(value = "/proposals", method = RequestMethod.GET)
    List<ProposalDto> getProposal(@RequestParam(required = false, defaultValue = "-1") Integer id) {

        List<Proposal> proposals = proposalService.getAll();

        if (id == -1)
            return new ArrayList<>(proposalConverter.convertModelsToDtos(proposals));

        Proposal proposal = new Proposal();
        proposals.stream().forEach(s -> {
            if (s.getId() == id) {
                proposal.setId(s.getId());
                proposal.setAuthorID(s.getAuthorID());
                proposal.setAbstractFileName(s.getAbstractFileName());
                proposal.setPaperFileName(s.getPaperFileName());
                proposal.setProposalName(s.getProposalName());
                proposal.setKeyWords(s.getKeyWords());
                proposal.setTopics(s.getTopics());
                proposal.setListOfAuthors(s.getListOfAuthors());
            }
        });
        ProposalDto result = new ProposalDto(proposal.getId(), proposal.getAuthorID(), proposal.getAbstractFileName(), proposal.getPaperFileName(), proposal.getProposalName(), proposal.getKeyWords(), proposal.getTopics(), proposal.getListOfAuthors());

        result.setId(proposal.getId());

        var results = new ArrayList<ProposalDto>();
        results.add(result);
        return results;
    }




}
