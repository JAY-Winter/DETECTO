package com.example.detecto.service;

import com.example.detecto.dto.EpochDto;
import com.example.detecto.dto.EquipmentEditDto;
import com.example.detecto.dto.EquipmentResponseDto;
import com.example.detecto.entity.Equipment;
import com.example.detecto.exception.AlreadyExistData;
import com.example.detecto.exception.DoesNotExistData;
import com.example.detecto.exception.InvalidData;
import com.example.detecto.repository.EquipmentRepository;
import com.example.detecto.tool.OSUpload;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EquipmentServiceImpl implements EquipmentService{
    private final OSUpload osUpload;
    private final EquipmentRepository equipmentRepository;
    private final WebClient webClient;

    @Override
    public boolean checkName(String name) {
        if(name == null) {
            throw new DoesNotExistData("이름을 넣어주세요");
        }

        Optional<Equipment> equipment = equipmentRepository.findById(name);

        if(equipment.isPresent()) {
            return false;
        }

        return true;
    }

    @Override
    public List<EquipmentResponseDto> read() {
        List<Equipment> equipments = equipmentRepository.findByType(0);

        return equipments.stream()
                .map(e -> {
                    EquipmentResponseDto er = new EquipmentResponseDto(e);
                    if(e.getAble() == 0){
                        int epoch = callEpoch();
                        er.setEpoch(epoch);
                    }else{
                        er.setEpoch(-1);
                    }

                    return er;
                })
                .collect(Collectors.toList());
    }


    public int callEpoch() {
        String url = "https://detec.store:5000/check";

        EpochDto epoch = webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(EpochDto.class)
                .block();

        return epoch.getData();
    }

    @Override
    public void edit(MultipartFile file, EquipmentEditDto equipmentEditDto) {
        if(checkName(equipmentEditDto.getName())) {
            throw new DoesNotExistData("해당 장비가 존재하지 않아요");
        }
        if(equipmentEditDto.getAble() > 1 || equipmentEditDto.getAble() < 0) {
            throw new InvalidData("able 값으로 0 또는 1 값을 넣어주세요");
        }
//        if(equipmentRepository.findByTypeCount(equipmentEditDto.getType()) > 0 && equipmentEditDto.getAble() == 1){
//            throw new AlreadyExistData("같은 type의 equipment가 이미 able상태입니다.");
//        }
        Equipment equipment = equipmentRepository.findById(equipmentEditDto.getName()).get();
        String url = equipment.getUrl();
        if(file == null) {
            String fileName = "item" + "/" + equipment.getName() + ".jpg";
            File uploadFile = null;
            try {
                uploadFile = osUpload.convert(file)        // 파일 생성
                    .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File convert fail"));
            } catch (Exception e) {
                e.printStackTrace();
            }

            osUpload.put("detec",fileName,uploadFile);
        }

        equipment.setDescription(equipmentEditDto.getDescription());
        equipment.setUrl(url);
        equipment.setAble(equipmentEditDto.getAble());
        equipmentRepository.save(equipment);
    }

    @Override
    public void delete(String name) {
        if(checkName(name)) {
            throw new DoesNotExistData("해당 장비가 존재하지 않아요");
        }
        equipmentRepository.deleteById(name);
    }
}
