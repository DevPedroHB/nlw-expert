package dev.pedrohb.certification.modules.students.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pedrohb.certification.modules.students.dtos.VerifyHasCertificationDTO;
import dev.pedrohb.certification.modules.students.useCases.VerifyHasCertificationUseCase;


@RestController
@RequestMapping("/students")
public class StudentController {
  @Autowired
  private VerifyHasCertificationUseCase verifyHasCertificationUseCase;

  @PostMapping("/verifyIfHasCertification")
  public String verifyIfHasCertification(@RequestBody VerifyHasCertificationDTO verifyHasCertificationDTO) {
    System.out.println(verifyHasCertificationDTO);

    var result = this.verifyHasCertificationUseCase.execute(verifyHasCertificationDTO);

    if(result){
      return "O usuário já fez a prova";
    }

    return "Usuário pode fazer a prova";
  }
}
