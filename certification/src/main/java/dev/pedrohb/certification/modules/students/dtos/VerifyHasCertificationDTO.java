package dev.pedrohb.certification.modules.students.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyHasCertificationDTO {
  private String email;
  private String technology;
}
