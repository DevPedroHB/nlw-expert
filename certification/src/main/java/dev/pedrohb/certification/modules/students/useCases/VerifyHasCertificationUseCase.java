package dev.pedrohb.certification.modules.students.useCases;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pedrohb.certification.modules.students.dtos.VerifyHasCertificationDTO;
import dev.pedrohb.certification.modules.students.repositories.CertificationStudentRepository;

@Service
public class VerifyHasCertificationUseCase {
  @Autowired
  private CertificationStudentRepository certificationStudentRepository;

  public boolean execute(VerifyHasCertificationDTO dto) {
    var result = this.certificationStudentRepository.findByStudentEmailAndTechnology(dto.getEmail(), dto.getTechnology());

    if(!result.isEmpty()){
      return true;
    }

    return false;
  }
}
