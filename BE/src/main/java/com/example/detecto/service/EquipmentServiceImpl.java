package com.example.detecto.service;

import com.example.detecto.dto.EquipmentEditDto;
import com.example.detecto.dto.EquipmentResponseDto;
import com.example.detecto.entity.Equipment;
import com.example.detecto.exception.DoesNotExistData;
import com.example.detecto.exception.InvalidData;
import com.example.detecto.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EquipmentServiceImpl implements EquipmentService{

    private final EquipmentRepository equipmentRepository;

    @Override
    public boolean checkName(String name) {
        if(name == null) throw new DoesNotExistData("이름을 넣어주세요");

        Optional<Equipment> equipment = equipmentRepository.findById(name);

        if(equipment.isPresent()) return false;

        return true;
    }

    @Override
    public List<EquipmentResponseDto> read() {
        List<Equipment> equipments = equipmentRepository.findByType(1);

        List<EquipmentResponseDto> result = equipments.stream().map(e -> new EquipmentResponseDto(e)).collect(Collectors.toList());

        return result;
    }

    @Override
    public void edit(EquipmentEditDto equipmentEditDto) {
        if(checkName(equipmentEditDto.getName())) throw new DoesNotExistData("해당 장비가 존재하지 않아요");
        if(equipmentEditDto.getAble() > 1 || equipmentEditDto.getAble() < 0) throw new InvalidData("able 값으로 0 또는 1 값을 넣어주세요");

        Optional<Equipment> op_equipment = equipmentRepository.findById(equipmentEditDto.getName());
        Equipment equipment = op_equipment.get();

        equipment.setDescription(equipmentEditDto.getDescription());
        equipment.setAble(equipmentEditDto.getAble());

        equipmentRepository.save(equipment);
    }

    @Override
    public void delete(String name) {
        if(checkName(name)) throw new DoesNotExistData("해당 장비가 존재하지 않아요");
        equipmentRepository.deleteById(name);
    }
}
